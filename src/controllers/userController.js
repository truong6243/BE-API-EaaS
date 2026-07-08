import { StatusCodes } from 'http-status-codes'
import { MOCK_USER } from '~/models/mockDatabase'
import { ResendProvider } from '~/providers/ResendProvider'

const register = async (req, res) => {
  try {
    const createdUser = MOCK_USER
    // Gửi mail cho user sau khi đăng ký tài khoản, có thể là mail xác nhận, mail welcome...vv
    // Bước gửi mail này sẽ là việc gửi hành động đến một dịch vụ Email as a Service.
    const to = MOCK_USER.RECEIVE_EMAIL
    const subject = 'Create account successfully - TruongLamDev'
    const html = `
      <h1> Welcome ${MOCK_USER.USERNAME}</h1>
      <h2>Your account has been created successfully </h2>
    `
    const sentEmailResponse = await ResendProvider.sendEmail({
      to,
      subject,
      html
    })
    // Trả về response với thông tin user đã được tạo
    res.status(StatusCodes.OK).json(createdUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  register
}
