import "./App.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

function App() {
  const validationSchema = Yup.object().shape({
    LIMIT_BAL: Yup.number().required("Required"),
    SEX: Yup.number().required("Required"),
    AGE: Yup.number().required("Required"),
    PAY_0: Yup.number().required("Required"),
    PAY_2: Yup.number().required("Required"),
    PAY_3: -Yup.number().required("Required"),
    PAY_4: -Yup.number().required("Required"),
    PAY_5: -Yup.number().required("Required"),
    PAY_6: -Yup.number().required("Required"),
    BILL_AMT1: Yup.number().required("Required"),
    BILL_AMT2: Yup.number().required("Required"),
    BILL_AMT3: Yup.number().required("Required"),
    BILL_AMT4: Yup.number().required("Required"),
    BILL_AMT5: Yup.number().required("Required"),
    BILL_AMT6: Yup.number().required("Required"),
    PAY_AMT1: Yup.number().required("Required"),
    PAY_AMT2: Yup.number().required("Required"),
    PAY_AMT3: Yup.number().required("Required"),
    PAY_AMT4: Yup.number().required("Required"),
    PAY_AMT5: Yup.number().required("Required"),
    PAY_AMT6: Yup.number().required("Required"),
  });
  const initialValues = {
    LIMIT_BAL: 20000,
    SEX: "M",
    AGE: 24,
    PAY_0: 2,
    PAY_2: 2,
    PAY_3: -1,
    PAY_4: -1,
    PAY_5: -2,
    PAY_6: -2,
    BILL_AMT1: 3913,
    BILL_AMT2: 3102,
    BILL_AMT3: 689,
    BILL_AMT4: 0,
    BILL_AMT5: 0,
    BILL_AMT6: 0,
    PAY_AMT1: 0,
    PAY_AMT2: 680,
    PAY_AMT3: 0,
    PAY_AMT4: 0,
    PAY_AMT5: 0,
    PAY_AMT6: 0,
  };

  const [slide, setSlide] = useState(1);
  const [isdefault, setisDefault] = useState();
  const [isLoading, setisLoading] = useState(true);

  const onSubmit = async (values) => {
    let {
      LIMIT_BAL,
      _SEX,
      AGE,
      PAY_0,
      PAY_2,
      PAY_3,
      PAY_4,
      PAY_5,
      PAY_6,
      BILL_AMT1,
      BILL_AMT2,
      BILL_AMT3,
      BILL_AMT4,
      BILL_AMT5,
      BILL_AMT6,
      PAY_AMT1,
      PAY_AMT2,
      PAY_AMT3,
      PAY_AMT4,
      PAY_AMT5,
      PAY_AMT6,
    } = values;
    console.log(values);
    let SEX;
    if ((_SEX = "M" || "m")) SEX = 1;
    else SEX = 2;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        LIMIT_BAL,
        SEX,
        AGE,
        PAY_0,
        PAY_2,
        PAY_3,
        PAY_4,
        PAY_5,
        PAY_6,
        BILL_AMT1,
        BILL_AMT2,
        BILL_AMT3,
        BILL_AMT4,
        BILL_AMT5,
        BILL_AMT6,
        PAY_AMT1,
        PAY_AMT2,
        PAY_AMT3,
        PAY_AMT4,
        PAY_AMT5,
        PAY_AMT6,
      }),
    };
    const response = await fetch(
      "https://creditcarddefault-pro.herokuapp.com/predict",
      requestOptions
    );
    const data = await response.json();
    setSlide(slide + 1);
    if (data === "Customer will DEFAULT !!!") {
      setisLoading(false);
      setisDefault(true);
    }

    if (data === "Customer will not default") {
      setisLoading(false);
      setisDefault(false);
    }
    // console.log(data);
    // this.setState({ postId: data.id });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <>
      <div className="wrapper position-relative">
        <div className="container">
          <form
            className="multisteps_form position-relative overflow-hidden mt-5 my-form"
            id="cc-form"
            onSubmit={handleSubmit}
          >
            {/* Form-header-content */}
            <div className="form_header_content text-center pt-4 mb-5">
              <h2>CC Defaulter Check</h2>
              <span>
                Please fill out this form to predict whether the person will
                default on their CC payment.
              </span>
            </div>

            {slide === 1 && (
              <>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="LIMIT_BAL" className="question_title">
                    Limit Balance
                  </label>
                  <input
                    type="text"
                    name="LIMIT_BAL"
                    placeholder="LIMIT_BAL"
                    value={values.LIMIT_BAL}
                    onChange={handleChange}
                  />
                  {errors.LIMIT_BAL && touched.LIMIT_BAL && (
                    <div id="basicValidationName-error" className="error">
                      {errors.LIMIT_BAL}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="SEX">Sex</label>
                  <input
                    type="text"
                    name="SEX"
                    placeholder="Input M or F"
                    value={values.SEX}
                    onChange={handleChange}
                  />
                  {errors.SEX && touched.SEX && (
                    <div id="basicValidationName-error" className="error">
                      {errors.SEX}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="AGE">Age</label>
                  <input
                    type="text"
                    name="AGE"
                    placeholder="AGE"
                    value={values.AGE}
                    onChange={handleChange}
                  />
                  {errors.AGE && touched.AGE && (
                    <div id="basicValidationName-error" className="error">
                      {errors.AGE}
                    </div>
                  )}
                </div>
              </>
            )}

            {slide === 2 && (
              <>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_0">PAY_0</label>
                  <input
                    type="text"
                    name="PAY_0"
                    placeholder="PAY_0"
                    value={values.PAY_0}
                    onChange={handleChange}
                  />
                  {errors.PAY_0 && touched.PAY_0 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_0}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_2">PAY_2</label>
                  <input
                    type="text"
                    name="PAY_2"
                    placeholder="PAY_2"
                    value={values.PAY_2}
                    onChange={handleChange}
                  />
                  {errors.PAY_2 && touched.PAY_2 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_2}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_3">PAY_3</label>
                  <input
                    type="text"
                    name="PAY_3"
                    placeholder="PAY_3"
                    value={values.PAY_3}
                    onChange={handleChange}
                  />
                  {errors.PAY_3 && touched.PAY_3 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_3}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_4">PAY_4</label>
                  <input
                    type="text"
                    name="PAY_4"
                    placeholder="PAY_4"
                    value={values.PAY_4}
                    onChange={handleChange}
                  />
                  {errors.PAY_4 && touched.PAY_4 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_4}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_5">PAY_5</label>
                  <input
                    type="text"
                    name="PAY_5"
                    placeholder="PAY_5"
                    value={values.PAY_5}
                    onChange={handleChange}
                  />
                  {errors.PAY_5 && touched.PAY_5 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_5}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_6">PAY_6</label>
                  <input
                    type="text"
                    name="PAY_6"
                    placeholder="PAY_6"
                    value={values.PAY_6}
                    onChange={handleChange}
                  />
                  {errors.PAY_6 && touched.PAY_6 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_6}
                    </div>
                  )}
                </div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT1">BILL_AMT1</label>
                  <input
                    type="text"
                    name="BILL_AMT1"
                    placeholder="BILL_AMT1"
                    value={values.BILL_AMT1}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT1 && touched.BILL_AMT1 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT1}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT2">BILL_AMT2</label>
                  <input
                    type="text"
                    name="BILL_AMT2"
                    placeholder="BILL_AMT2"
                    value={values.BILL_AMT2}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT2 && touched.BILL_AMT2 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT2}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT3">BILL_AMT3</label>
                  <input
                    type="text"
                    name="BILL_AMT3"
                    placeholder="BILL_AMT3"
                    value={values.BILL_AMT3}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT3 && touched.BILL_AMT3 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT3}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT4">BILL_AMT4</label>
                  <input
                    type="text"
                    name="BILL_AMT4"
                    placeholder="BILL_AMT4"
                    value={values.BILL_AMT4}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT4 && touched.BILL_AMT4 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT4}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT5">BILL_AMT5</label>
                  <input
                    type="text"
                    name="BILL_AMT5"
                    placeholder="BILL_AMT5"
                    value={values.BILL_AMT5}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT5 && touched.BILL_AMT5 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT5}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="BILL_AMT6">BILL_AMT6</label>
                  <input
                    type="text"
                    name="BILL_AMT6"
                    placeholder="BILL_AMT6"
                    value={values.BILL_AMT6}
                    onChange={handleChange}
                  />
                  {errors.BILL_AMT6 && touched.BILL_AMT6 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.BILL_AMT6}
                    </div>
                  )}
                </div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT1">PAY_AMT1</label>
                  <input
                    type="text"
                    name="PAY_AMT1"
                    placeholder="PAY_AMT1"
                    value={values.PAY_AMT1}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT1 && touched.PAY_AMT1 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT1}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT2">PAY_AMT2</label>
                  <input
                    type="text"
                    name="PAY_AMT2"
                    placeholder="PAY_AMT2"
                    value={values.PAY_AMT2}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT2 && touched.PAY_AMT2 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT2}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT3">PAY_AMT3</label>
                  <input
                    type="text"
                    name="PAY_AMT3"
                    placeholder="PAY_AMT3"
                    value={values.PAY_AMT3}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT3 && touched.PAY_AMT3 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT3}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT4">PAY_AMT4</label>
                  <input
                    type="text"
                    name="PAY_AMT4"
                    placeholder="PAY_AMT4"
                    value={values.PAY_AMT4}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT4 && touched.PAY_AMT4 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT4}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT5">PAY_AMT5</label>
                  <input
                    type="text"
                    name="PAY_AMT5"
                    placeholder="PAY_AMT5"
                    value={values.PAY_AMT5}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT5 && touched.PAY_AMT5 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT5}
                    </div>
                  )}
                </div>
                <div className="form-group animate__animated animate__fadeInRight animate_25ms">
                  <label htmlFor="PAY_AMT6">PAY_AMT6</label>
                  <input
                    type="text"
                    name="PAY_AMT6"
                    placeholder="PAY_AMT6"
                    value={values.PAY_AMT6}
                    onChange={handleChange}
                  />
                  {errors.PAY_AMT6 && touched.PAY_AMT6 && (
                    <div id="basicValidationName-error" className="error">
                      {errors.PAY_AMT6}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  id="cc-form"
                  className="btn btn-primary btn-lg submit-btn"
                >
                  {!isLoading ? "loading" : "Submit"}
                </button>
              </>
            )}
            {slide === 5 && (
              <>
                {isLoading ? (
                  <h1 className="text-center" style={{ color: "grey" }}>
                    Loading
                  </h1>
                ) : (
                  <>
                    {isdefault && (
                      <h1 className="text-center" style={{ color: "red" }}>
                        Customer will DEFAULT
                      </h1>
                    )}

                    {!isdefault && (
                      <h1 className="text-center" style={{ color: "green" }}>
                        Customer will not DEFAULT
                      </h1>
                    )}
                  </>
                )}
              </>
            )}

            <div
              style={{
                transform: "translateY(330px)",
                position: "absolute",
                left: "50%",
                bottom: "20px",
                transform: "translateX(-50%)",
              }}
              className="form_btn text-center"
            >
              <button
                type="button"
                className="f_btn active text-uppercase rounded-pill text-white"
                onClick={() => {
                  if (slide > 1) {
                    setSlide(slide - 1);
                  }
                }}
              >
                <span>
                  <i className="fas fa-arrow-left" />
                </span>{" "}
                Previous
              </button>

              <button
                type="button"
                className="f_btn active text-uppercase rounded-pill text-white"
                id="nextBtn"
                onClick={() => {
                  if (slide < 4) {
                    setSlide(slide + 1);
                  }
                }}
              >
                {" "}
                Next
                <i className="fas fa-arrow-right" />
              </button>
            </div>
          </form>
        </div>
        {/*-------- Form Button --------*/}
      </div>
      {/* jQuery-js include */}
      {/* Countdown-js include */}
      {/* Bootstrap-js include */}
      {/* jQuery-validate-js include */}
      {/* Custom-js include */}
    </>
  );
}

export default App;
