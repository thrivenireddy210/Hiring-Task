import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import * as Yup from "yup";

import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  formData: any | undefined;
  setFormData: any | undefined;
}> = ({ handleTab,formData, setFormData }) => {
  const [isInterviewModeDropdownOpen, setIsInterviewModeDropdownOpen] = useState(false);
  const [isInterviewDurationDropdownOpen, setIsInterviewDurationDropdownOpen] = useState(false);
  const [isInterviewLanguageDropdownOpen, setIsInterviewLanguageDropdownOpen] = useState(false);
  
  const handleSelectChange = (name: string, value: string) => {
    const updatedFormValues:IInterViewSettings  = {
      ...values,
      [name]: value,
    };
  
    setFieldValue(name, value);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      interviewSettings: updatedFormValues,
    }));
  };
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
   
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

   
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
    <Box width="100%">
      <Box
        onFocus={() => setIsInterviewModeDropdownOpen(true)}
        onBlur={() => setIsInterviewModeDropdownOpen(false)}
      >
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(name: string, value: string) => {
            handleSelectChange(name, value);
            setIsInterviewModeDropdownOpen(false); 
          }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
      </Box>
      <Box
        onFocus={() => setIsInterviewDurationDropdownOpen(true)}
        onBlur={() => setIsInterviewDurationDropdownOpen(false)}
        mt={isInterviewModeDropdownOpen ? '8rem' : '2rem'}
      >
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(name: string, value: string) => {
            handleSelectChange(name, value);
            setIsInterviewDurationDropdownOpen(false); 
          }}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
      </Box>
      <Box
        onFocus={() => setIsInterviewLanguageDropdownOpen(true)}
        onBlur={() => setIsInterviewLanguageDropdownOpen(false)}
        mt={isInterviewDurationDropdownOpen ? '8rem' : '2rem'}
      >
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(name: string, value: string) => {
            handleSelectChange(name, value);
            setIsInterviewLanguageDropdownOpen(false); 
          }}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
      </Box>
      <Flex w="100%" justify="flex-end" mt={isInterviewDurationDropdownOpen ? '2rem' : '8rem'} gap="20px">
        <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
          Previous
        </Button>
        <Button colorScheme="red" type="submit">
          Submit
        </Button>
      </Flex>
    </Box>
  </Box>
  
  );
};

export default InterviewDetailsForm;
