import { useAppSelector } from "@stores/hooks";
import { phaserConfig } from "@phaserGame/game";
import { useRef, useState, Ref, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";

const Dummy = () => {
  const value = useAppSelector((state) => state.dummy.value);

  const gameRef = useRef(null);

  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    setInitialize(true);
  }, []);
  return (
    <>
      <p className="text-3xl font-bold underline">Value in React : {value}</p>
      {!initialize && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader size={100} />
        </div>
      )}
      <IonPhaser
        ref={gameRef as Ref<HTMLIonPhaserElement> | undefined}
        game={phaserConfig}
        initialize={initialize}
        placeholder={"Game"}
      />
    </>
  );
};

export default Dummy;
