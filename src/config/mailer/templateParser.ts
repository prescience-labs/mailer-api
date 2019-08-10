import * as fs from 'fs'
import * as handlebars from 'handlebars'

enum templates {
  passwordResetTemplate = 'passwordResetRequest',
}
export default <T>(template: keyof typeof templates, params: T) => {
  const templateDir = 'src/config/mailer/templates'

  const source = fs.readFileSync(`${templateDir}/${template}/${template}.hbs`).toString()
  const compiledTemplate = handlebars.compile(source)

  return compiledTemplate(params)
}
