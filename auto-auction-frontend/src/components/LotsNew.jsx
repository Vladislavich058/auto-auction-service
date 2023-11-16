import { Spinner } from "@material-tailwind/react";
import LotService from "API/LotService";
import LotNewList from "components/LotNewList";
import MyAlert from "components/UI/Alert/MyAlert";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";

function LotsNew() {
  const [lots, setLots] = useState([]);

  const [fetchLots, isLotsLoading, lotError, open, setOpen] = useFetching(
    async () => {
      const response = await LotService.getNewLots();
      setLots(response.data);
    }
  );

  useEffect(() => {
    fetchLots();
  }, []);

  return (
    <div className="my-10">
      <MyAlert type="error" open={open} onClose={() => setOpen(false)}>
        {lotError}
      </MyAlert>
      {isLotsLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <LotNewList lots={lots} />
      )}
    </div>
  );
}

export default LotsNew;
