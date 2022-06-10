import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import './contact.scss'

export default function Contact() {
  const form = useRef()
  const [loading, setLoading] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .sendForm(
        'service_2gmkf37',
        'template_yf0plrd',
        form.current,
        'user_gd2KR0qfZipAt8R4uhcr4'
      )
      .then(
        (result) => {
          e.target.reset()
          setLoading(false)
          Toast.fire({
            icon: 'success',
            title: 'Enviado Correctamente'
          })
        },
        (error) => {
          console.log(error.text)
          Toast.fire({
            icon: 'error',
            title: 'Hubo un error'
          })
        }
      )
  }
  return (
    <section className="contact__section">
      <div className="form__container">
        <form
          ref={form}
          onSubmit={sendEmail}
          className=""
          style={{ boxShadow: '0px 0px 20px 0px #00000026' }}
        >
          <div className="form__content">
            <div className="form__userinfo">
              <div>
                <input
                  type="text"
                  className="form__field"
                  placeholder="Name"
                  name="user_name"
                  id="name"
                  required
                  disabled={loading}
                  minLength={3}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="form__field"
                  placeholder="Email"
                  name="user_email"
                  id="email"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <input
                  type="tel"
                  className="form__field"
                  placeholder="Telefono"
                  name="user_phone"
                  id="phone"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="form__message">
              <textarea
                name="message"
                className="form__textarea"
                minLength={20}
                disabled={loading}
              >
                Mensaje
              </textarea>
            </div>
          </div>

          <div className="form__button">
            <input type="submit" value="Enviar" />
            <div style={{ display: loading ? 'block' : 'none' }} className="" />
          </div>
        </form>
      </div>
    </section>
  )
}
