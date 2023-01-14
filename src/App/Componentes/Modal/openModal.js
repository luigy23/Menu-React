import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

export default function openModal() {
  const Modal = lazy(() => import("../Modal"));
  const modalArticle = document.createElement("article");
  modalArticle.id = "modal";
  document.body.appendChild(modalArticle);

  const root = createRoot(modalArticle);
  root.render(
    <Suspense fallback={<div>Cargando...</div>}>
      <Modal root={root} title={"Modal prueba"}>
        holalaaa
      </Modal>
    </Suspense>
  );
}
