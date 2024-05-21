import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MsaApiType } from "./types";
import { AxiosError } from "axios";
import { getMSAData } from "./api/getMSAData";
import IndividualMSA from "./IndividualMSA";
import NewIndividualMSA from "./NewIndividualMSA";

const IndividualMsaHandler = () => {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;
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
    console.log("location state:", state);
    console.log("id before fetch:", id);
    if (id) {
      fetchData(id);
    }
  }, [id]);
console.log(id);
  return id ? (
    <>
      {/* <IndividualMSA msa_id={id} responses={responses} loading={loading} /> */}
      <NewIndividualMSA msa_id={id} responses={responses} loading={loading} />
    </>
  ):null
};

export default IndividualMsaHandler;
