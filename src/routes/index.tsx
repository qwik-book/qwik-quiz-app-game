import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { Image, Alert } from '~/components/shared';
import { QUESTIONS } from '~/db/questions';

export default component$(() => {
  const start = useSignal<boolean>(false)
  const answers = useSignal<Array<any>>([]);
  const question = useSignal(null);
  const isCorrect = useSignal(null);
  const disabledAnswers = useSignal(false);
  const selectOption = $((option: number) => {
    isCorrect.value = answers.value[option].isCorrect;
    disabledAnswers.value = true;
  });

  const answerOrderDefine = $(() => {
    const order = [0, 1, 2, 3];
    return order.sort(() => Math.random() - 0.5);
  });

  useTask$(async ({ track }) => {
    track(() => question.value);
    track(() => start.value);

    if (start.value) {
      disabledAnswers.value = false;
      isCorrect.value = null;
      const selectQuestion = Math.floor(Math.random() * QUESTIONS.length);
      const orderElements = await answerOrderDefine();
  
      answers.value = orderElements.map((item) => {
        return QUESTIONS[selectQuestion].answers[item];
      });
  
      question.value = QUESTIONS[selectQuestion];
    }
  });

  return (
    <div>
      <h1> Flag Quiz</h1>
      <p>El juego consiste en seleccionar una opción válida</p>
      <br />

      { !start.value ? (
        <div class='container'>
          <p>Pulsa para iniciar la partida</p>
          <div class='flex-container'>
            <div
              class={'answer new_answer'}
              onClick$={() => (start.value = true)}
            >
              Iniciar
            </div>
          </div>
        </div>
      ): undefined}

      {question.value ? (
        <div class='container'>
          <div class='question'>
            <Image
              src={question.value['content']}
              size={{ width: 147, height: 110 }}
              alt={'¿De dónde es la bandera'}
            />
          </div>
          {isCorrect.value ? (
            <Alert text={'¡Qué bien, has acertado!'} type='success' />
          ) : isCorrect.value === false ? (
            <Alert text={'¡Lo siento, NO has acertado!'} type='danger' />
          ) : undefined}
          {disabledAnswers.value ? (
            <>
              <div class='flex-container'>
                <div
                  class={'answer new_answer'}
                  onClick$={() => (question.value = null)}
                  key={'new_answer_btn'}
                >
                  Cargar nueva pregunta
                </div>
              </div>
              <br />
              <br />
            </>
          ) : undefined}

          {answers.value.length
            ? answers.value.map((item, index) => {
                return (
                  <div
                    class={
                      'flex-container' +
                      ((disabledAnswers.value && ' disabled') || '')
                    }
                    key={'answer_' + index}
                  >
                    <div class='answer' onClick$={() => selectOption(index)}>
                      {item['content']}
                    </div>
                  </div>
                );
              })
            : undefined}
        </div>
      ) : undefined}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Book - Quizz App',
  meta: [
    {
      name: 'description',
      content: 'Proyecto de preguntas y respuestas sobre banderas',
    },
    {
      name: 'keywords',
      content: 'qwik, qwik-book,quiz-app',
    },
    {
      name: 'author',
      content: 'Anartz Mugika Ledo',
    },
    {
      name: 'og:image',
      content:
        'https://jgengle.github.io/Leaflet/examples/quick-start/thumbnail.png',
    },
    {
      name: 'og:url',
      content: 'https://github.com/qwik-book/qwik-book-projects',
    },
    {
      name: 'twitter:image',
      content:
        'https://jgengle.github.io/Leaflet/examples/quick-start/thumbnail.png',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Qwik - El libro',
    },
    {
      name: 'twitter:description',
      content:
        'Aprende Qwik desde 0 paso a paso aplicando conceptos teórico-prácticas hasta publicar nuestros proyectos',
    },
  ],
};
