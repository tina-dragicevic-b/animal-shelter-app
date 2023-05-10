import { Card } from 'primereact/card';
import { useContext } from 'react';
import { useForm,  } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { UserContext } from "../context/UserContext";
const DonationForm = ({onCreateNew}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  
    const { user } = useContext(UserContext);


    const onSubmit = (data) => {
        if(data.donation === undefined) {
            data.donation = "";
        }
        data.donated = false;
        data.userDonation = !(user === "Admin");
        onCreateNew(user === "Admin", data)
    }

    return (
      <div>
        <Card>
          <h5 style={{ textAlign: "center", fontFamily: "cursive" }}>
            New Donation
          </h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field" style={{ marginTop: "20px" }}>
              <span className="p-float-label">
                <InputText
                  type="text"
                  name="type"
                  {...register("type", { required: true })}
                />
                <label>Type of donation*</label>
                {errors.type && (
                  <div>
                    <span className="p-error">Input type of donation. </span>
                  </div>
                )}
              </span>
            </div>
            <div className="field" style={{ marginTop: "20px" }}>
              <span className="p-float-label">
                <InputText
                  name="value"
                  {...register("value", { required: true })}
                />
                <label>Value*</label>
                {errors.value && (
                  <div>
                    <span className="p-error">Input amount. </span>
                  </div>
                )}
              </span>
            </div>

            <div className="field" style={{ marginTop: "20px" }}>
              <span className="p-float-label">
                <InputTextarea
                  {...register("description")}
                  name="description"
                />
                <label>Description</label>
              </span>
            </div>
            <Button
              type="submit"
              label="Submit"
              className="mt-2 p-button-warning"
            />
          </form>
        </Card>
      </div>
    );
}; export default DonationForm;