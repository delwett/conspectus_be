import nodemailer from 'nodemailer'
import { SmtpHost, SmtpUser, SmtpPass, EmailFrom } from '@/config'

export const from = `"Conspectus informer" <${EmailFrom}>`

const emailTransport = nodemailer.createTransport({
  host: SmtpHost,
  port: 465,
  secure: true,
  auth: {
    user: SmtpUser,
    pass: SmtpPass
  }
})

export default emailTransport
