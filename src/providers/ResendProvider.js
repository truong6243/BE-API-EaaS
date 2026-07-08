import { Resend } from 'resend'
import { env } from '~/config/environment'

const RESEND_API_KEY = env.RESEND_API_KEY
// để gửi email cần xác minh đang sở hữu và kiểm soát tên miền (domain)
// nếu không có phải dùng email của dev của resend để gửi
const ADMIN_SENDER_EMAIL = env.ADMIN_SENDER_EMAIL

const resendInstance = new Resend(RESEND_API_KEY)
// function gửi mail
const sendEmail = async ({ to, subject, html }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await resendInstance.emails.send({
      from: ADMIN_SENDER_EMAIL,
      to: to,
      subject,
      html
    })
    return data
  } catch (error) {
    throw error
  }
}

export const ResendProvider = { sendEmail }
