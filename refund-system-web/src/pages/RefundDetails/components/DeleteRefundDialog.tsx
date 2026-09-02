import { useState } from "react";

import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

import { deleteRefund } from "../../../services/refund";

import { Button, Text } from "../../../components/ui";

interface DeleteRefundDialogProps {
  refundId: string;
}

export default function DeleteRefundDialog({
  refundId,
}: DeleteRefundDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteRefund(refundId);

      setOpen(false);

      toast.success("Solicitação excluída com sucesso!");

      navigate("/");
    } catch (error) {
      toast.error("Não foi possível excluir a solicitação.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Excluir</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-100/80" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-bg-light p-10">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <header className="flex flex-col gap-3">
              <Dialog.Title asChild>
                <Text as="h2" size="lg" weight="bold">
                  Excluir solicitação
                </Text>
              </Dialog.Title>

              <Dialog.Description asChild>
                <Text textColor="secondary">
                  Tem certeza que deseja excluir essa solicitação? Essa ação é
                  irreversível.
                </Text>
              </Dialog.Description>
            </header>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Dialog.Close asChild>
                <Button variant="ghost" disabled={isDeleting}>
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Excluindo..." : "Confirmar"}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
