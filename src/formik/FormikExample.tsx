
import {
  Formik,
  Form,
  Field,
} from 'formik';
import * as Yup from 'yup';


interface FormValues {
  name: string
  nick: string
}

export const FormikExample: React.FC<{}> = () => {
  const initialValues: FormValues = {name: '', nick: ''};

  const schema = Yup.object().shape({
    nick: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required Nick'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
       >
        <Form>
          <label htmlFor="name">Name: </label>
          <Field id="name" name="name" placeholder="Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="nick">Nick: </label>
          <Field id="nick" name="nick" placeholder="Nick" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}