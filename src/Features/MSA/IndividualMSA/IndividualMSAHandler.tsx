import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MsaApiType } from "./types";
import { AxiosError } from "axios";
import { getMSAData } from "./api/getMSAData";
import IndividualMSA from "./IndividualMSA";

const IndividualMsaHandler = () => {
  const location = useLocation();
  const { state } = location;
  const id = state?.msa_id;
  const [responses, setResponses] = useState<
  MsaApiType | AxiosError<unknown, any>
  >();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async (msaid: string) => {
      try {
        const response = await getMSAData(msaid);
        setResponses(response);
        setLoading(false);
        } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);
console.log(id);
  return (
    <>
      <IndividualMSA msa_id={id} responses={responses} loading={loading} />
    </>
  );
};

export default IndividualMsaHandler;
