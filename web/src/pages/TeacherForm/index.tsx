import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'

import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

import './styles.css'

function TeacherForm() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ])

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Successful registration')

        history.push('/')
      })
      .catch(() => {
        alert('Registration error')
      })
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Amazing that you want to teach'
        description='The first step is to fill out the registration form'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your info</legend>

            <Input
              name='name'
              label='Full name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name='whatsapp'
              label='Whatsapp'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name='bio'
              label='Biography'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>

            <Select
              name='subject'
              label='Subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Biology', label: 'Biology' },
                { value: 'Science', label: 'Science' },
                { value: 'Math', label: 'Math' },
                { value: 'English', label: 'English' },
                { value: 'Quimics', label: 'Quimics' },
                { value: 'Phisics', label: 'Phisics' },
                { value: 'History', label: 'History' },
              ]}
            />
            <Input
              name='cost'
              label='Cost / h'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Available times
              <button type='button' onClick={addNewScheduleItem}>
                + New time
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className='schedule-items'>
                  <Select
                    name='week_day'
                    label='Week day'
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    options={[
                      { value: '0', label: 'Sunday' },
                      { value: '1', label: 'Monday' },
                      { value: '2', label: 'Tuesday' },
                      { value: '3', label: 'Wednesday' },
                      { value: '4', label: 'Thursday' },
                      { value: '5', label: 'Friday' },
                      { value: '6', label: 'Saturday' },
                    ]}
                  />
                  <Input
                    name='from'
                    label='from'
                    type='time'
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name='to'
                    label='to'
                    type='time'
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Important warning' />
              Important! <br />
              Fill all the fields
            </p>
            <button type='submit'>Save registration</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
