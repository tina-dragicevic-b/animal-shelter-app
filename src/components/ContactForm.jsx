import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react'
import {postComment, getComments} from '../utils/api'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
 
const ContactForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const [comments, setComments] = useState();
    const onSubmit = (data) => {
        postComment(data)
    }

    useEffect(() => {
        getComments().then(response => {
            setComments(() => [...response.data])
        })
    }, [])

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="field"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <InputText
              type="email"
              {...register("email", { required: true })}
            />
            <label htmlFor="email">Email*</label>
          </span>
          {errors.email && <div><span className="p-error">Email is required. </span></div>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <span className="p-float-label p-input-icon-right">
            <InputTextarea
              rows={5}
              cols={30}
              {...register("comment", {  minLength: 10, required: true, maxLength: 99 })}
            />
            <label htmlFor="text">Comment*</label>
          </span>
          {errors.comment?.type == 'required' &&  <div><span className="p-error">Please leave a comment.</span></div>}
          {errors.comment?.type == 'minLength' && <div><span className="p-error">At least 10 letters. </span></div>}
          {errors.comment?.type == 'maxLength' && <div><span className="p-error">Max 99 letters. </span></div>}
        </div>
        <Button type="submit" label="Submit" className="mt-2" />
      </form>
    );
};
export default ContactForm;