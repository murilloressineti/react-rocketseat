import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { refundSchema, type RefundFormData } from "../../schemas/refund";

import { createReceipt } from "../../services/receipt";
import { createRefund } from "../../services/refund";

import { formatCurrencyToCents } from "../../utils/formatCurrencyToCents";

import { refundCategories } from "../../constants/refundCategories";

import { Container } from "../../components/layout";

import {
  Button,
  FileInput,
  Icon,
  Input,
  Select,
  Text,
} from "../../components/ui";

import { CheckCircle } from "../../assets/icons";

export default function NewRefund() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RefundFormData>({
    resolver: zodResolver(refundSchema),
  });

  async function onSubmit(data: RefundFormData) {
    try {
      const receipt = await createReceipt(data.receipt);

      await createRefund({
        title: data.title,
        category: data.category,
        value: formatCurrencyToCents(data.value),
        receipt: receipt.id,
      });

      setSuccess(true);

      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível enviar a solicitação.");
    }
  }

  function handleNewRefund() {
    (reset(), setSuccess(false));
  }

  return (
    <Container className="max-w-lg gap-10">
      {success ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-6">
            <Text as={"h2"} size="xl" textColor="brand" weight="bold">
              Solicitação enviada!
            </Text>

            <Icon svg={CheckCircle} className="size-28" />

            <Text textColor="secondary" className="text-center">
              Agora é apenas aguardar! Sua solicitação será analisada e, em
              breve, o setor financeiro irá entrar em contato com você.
            </Text>
          </div>

          <Button onClick={handleNewRefund}>Nova solicitação</Button>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="flex flex-col gap-3">
            <Text as={"h2"} size="lg" weight="bold">
              Nova solicitação de reembolso
            </Text>

            <Text textColor="secondary">
              Dados da despesa para solicitar reembolso.
            </Text>
          </header>

          {/* Refund details */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              label="Nome da Solicitação"
              placeholder="Digite o nome da solicitação"
              {...register("title")}
              error={errors.title?.message}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <Select
                  label="Categoria"
                  defaultValue=""
                  {...register("category")}
                  error={errors.category?.message}
                >
                  <option value="" disabled>
                    Selecione
                  </option>

                  {Object.entries(refundCategories).map(([value, category]) => (
                    <option key={value} value={value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>

              <Input
                label="Valor"
                placeholder="0,00"
                className="w-38"
                {...register("value")}
                error={errors.value?.message}
              />
            </div>

            {/* Actions */}
            <FileInput
              label="Comprovante"
              accept=".jpg,.jpeg,.png,.pdf"
              error={errors.receipt?.message}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setValue("receipt", file, {
                    shouldValidate: true,
                  });
                }
              }}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </>
      )}
    </Container>
  );
}
