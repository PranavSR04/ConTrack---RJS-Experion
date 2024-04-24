import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MsaApiType } from "./types";
import { AxiosError } from "axios";
import { getMSAData } from "./api/getMSAData";
import IndividualMSA from "./IndividualMSA";

const IndividualMsaHandler = () => {
  const location = useLocation();
  const { state } = location;
  const msa_id = state?.msa_id;
  const [id, setId] = useState<string>();
  const [responses, setResponses] = useState<
  MsaApiType | AxiosError<unknown, any>
  >();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setId(msa_id);
    const fetchData = async (id: string) => {
      try {
        const response = await getMSAData(id);
        setResponses(response);
        setLoading(false);
        console.log("Contracts response: ", response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);
console.log(id);
  return id ? (
    <>
      <IndividualMSA msa_id={id} responses={responses} loading={loading} />
    </>
  ):null
};

export default IndividualMsaHandler;
