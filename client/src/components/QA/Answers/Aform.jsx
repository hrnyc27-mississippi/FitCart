import React, { useState } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';
import axios from 'axios';

const Aform = ({ productName, questionId, questionBody }) => {
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [answerInputError, setAnswerInputError] = useState(false);
  const [nicknameInputError, setNicknameInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (answerInput === '') {
      setAnswerInputError(true);
    } else if (nicknameInput === '') {
      setNicknameInputError(true);
    } else if (!emailInput.includes('@')) {
      setEmailInputError(true);
    } else {
      postAnswer();
    }
  };

  const postAnswer = () => {
    axios
      .post(`http://3.134.102.30/qa/${questionId}/answers`, {
        body: answerInput,
        name: nicknameInput,
        email: emailInput,
      })
      .then(res => console.log(res))
      .then(res => setModalIsOpen(false))
      .catch(err => console.error(err));
  };

  return (
    <>
      <u onClick={() => setModalIsOpen(true)} style={{ cursor: 'pointer' }}>
        Add Answer
      </u>
      <Modal
        closeIcon={true}
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <Header size='large' textAlign='left'>
          Submit an Answer
        </Header>
        <Header size='medium' textAlign='left'>
          {productName} : {questionBody}
        </Header>
        <Modal.Content>
          <Form>
            <Form.TextArea
              label='Your Answer'
              name='answerInput'
              type='text'
              required={true}
              value={answerInput}
              maxLength='1000'
              onChange={e => setAnswerInput(e.target.value)}
              placeholder={`answer ${questionBody} here`}
              error={
                answerInputError
                  ? {
                      content: 'Please submit an answer',
                      pointing: 'below',
                    }
                  : false
              }
            />
            <Form.Input
              type='text'
              label='Nickname'
              required={true}
              maxLength='60'
              placeholder='Example: jack543!'
              name='nicknameInput'
              value={nicknameInput}
              onChange={e => setNicknameInput(e.target.value)}
              error={
                nicknameInputError
                  ? {
                      content: 'Please enter a nickname',
                      pointing: 'below',
                    }
                  : false
              }
            />
            <small>
              For Privacy reasons, do not use your full name or email address.
            </small>
            <br />
            <Form.Input
              label='Email'
              type='email'
              maxLength='60'
              placeholder='Example: jack@email.com'
              name='emailInput'
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              required={true}
              error={
                emailInputError
                  ? {
                      content: 'Please enter a valid email address',
                      pointing: 'below',
                    }
                  : false
              }
            />
            <small>For authentication reasons, you will not be emailed.</small>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='submit'
            basic
            color='olive'
            content='Submit Answer'
            onClick={e => handleSubmit(e)}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Aform;