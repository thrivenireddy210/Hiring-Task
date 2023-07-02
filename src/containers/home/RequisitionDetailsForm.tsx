import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  formData: any | undefined;
  setFormData: any | undefined;
}> = ({ handleTab, formData, setFormData }) => {
  const [isInterviewUrgencyDropdownOpen, setIsInterviewUrgencyDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const updatedFormValues: IRequisitionDetails = {
      ...values,
      [name]: value,
    };
  
    setFieldValue(name, value);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      requisitionDetails: updatedFormValues,
    }));
  };
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const handleSelectChange = (name: string, value: string) => {
    const updatedFormValues: IRequisitionDetails = {
      ...values,
      [name]: value,
    };
  
    setFieldValue(name, value);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      requisitionDetails: updatedFormValues,
    }));
  };
  

  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    },
  });

  return (
   
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <Box mt="1rem" position="relative">
          <Box onFocus={() => setIsGenderDropdownOpen(true)} onBlur={() => setIsGenderDropdownOpen(false)}>
            <FormSelect
              label="Gender"
              name="gender"
              placeholder="Select gender"
              options={genderOptions}
              // onChange={handleSelectChange}
              onChange={(name: string, value: string) => {
                handleSelectChange(name, value);
                setIsGenderDropdownOpen(false);
               
              }}
              onBlur={setFieldTouched}
              error={errors.gender}
              touched={touched.gender}
              value={values.gender}
            />
          </Box>
        </Box>
        <Box  position="relative" style={{ marginTop: isGenderDropdownOpen ? '8rem' : '2rem' }}
         onFocus={() => setIsInterviewUrgencyDropdownOpen(true)}
         onBlur={() => setIsInterviewUrgencyDropdownOpen(false)}
       >
          <FormSelect
            label="Urgency"
            name="urgency"
            placeholder="Select urgency"
            options={urgencyOptions}
            onChange={(name: string, value: string) => {
              handleSelectChange(name, value);
              setIsInterviewUrgencyDropdownOpen(false); 
            }}
            onBlur={setFieldTouched}
            error={errors.urgency}
            touched={touched.urgency}
            value={values.urgency}
          />
        </Box>
        <Flex w="100%" justify="flex-end" mt='8rem'>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
    
  );
};

export default RequisitionDetailsForm;
