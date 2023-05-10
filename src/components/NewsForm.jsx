import { useContext, useEffect, useState } from 'react';
import { useForm,  } from 'react-hook-form';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import { Checkbox } from 'primereact/checkbox';
 
const NewsForm = ({createNews}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [important, setImportant] = useState(false);

  const onSubmit = (data) => {
    const date = new Date();
    data.important = important;
    data.date = date.toLocaleString();
    createNews(data);
  };

  return (
    <form style={{ marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className="p-float-label">
          <InputText
            style={{ width: "100%" }}
            name="title"
            {...register("title", { required: true })}
          />
          <label>Title*</label>
        </span>
        {errors.title && (
          <div>
            <span className="p-error">Title is required</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: "25px" }}>
        <span className="p-float-label">
          <InputTextarea
            style={{ width: "100%" }}
            name="content"
            {...register("content", { required: true })}
          />
          <label>Content*</label>
        </span>
        {errors.content && (
          <div>
            <span className="p-error">Content is required</span>
          </div>
        )}
      </div>
      <div style={{ marginTop: "25px" }}>
        <span className="p-float-label">
          <InputText
            style={{ width: "100%" }}
            name="image"
            {...register("image")}
          />
          <label>Image link</label>
        </span>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "25px" }}>
        <span>
          <Checkbox
            {...register("important")}
            checked={important}
            onChange={() => setImportant(!important)}
            name='important'
          />
          <label> Important!</label>
        </span>
      </div>
      <Button type="submit" label="Submit" className="mt-2 p-button-warning" />
    </form>
  );
}; export default NewsForm