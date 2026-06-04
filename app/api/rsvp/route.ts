import { NextResponse } from 'next/server'
import { z } from 'zod'

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Укажите имя').max(200),
  attendance: z.enum(['attending', 'with-partner', 'not-attending']),
})

const ATTENDANCE_LABELS: Record<
  z.infer<typeof rsvpSchema>['attendance'],
  string
> = {
  attending: 'Обязательно буду',
  'with-partner': 'Приду с парой',
  'not-attending': 'К сожалению, не смогу присутствовать',
}

export async function POST(request: Request) {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL

  if (!webAppUrl) {
    return NextResponse.json(
      { error: 'RSVP не настроен. Добавьте GOOGLE_SHEETS_WEB_APP_URL в .env.local' },
      { status: 503 },
    )
  }

  try {
    const body = await request.json()
    const parsed = rsvpSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? 'Неверные данные'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { name, attendance } = parsed.data

    const sheetsResponse = await fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        attendance,
        attendanceLabel: ATTENDANCE_LABELS[attendance],
        timestamp: new Date().toISOString(),
      }),
      redirect: 'follow',
    })

    const text = await sheetsResponse.text()
    let result: { success?: boolean; error?: string } = { success: sheetsResponse.ok }

    try {
      result = JSON.parse(text) as typeof result
    } catch {
      if (!sheetsResponse.ok) {
        const accessDenied =
          sheetsResponse.status === 403 ||
          text.includes('Доступ закрыт') ||
          text.includes('Access denied')

        return NextResponse.json(
          {
            error: accessDenied
              ? 'Нет доступа к Google Script. В развертывании выберите «У кого есть доступ» → Все, затем создайте новое развертывание.'
              : 'Не удалось сохранить ответ в таблицу. Проверьте URL в .env.local и что скрипт развернут как веб-приложение.',
          },
          { status: 502 },
        )
      }
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? 'Не удалось сохранить ответ' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Ошибка при отправке' }, { status: 500 })
  }
}
