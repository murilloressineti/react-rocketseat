import {
  Button,
  FileInput,
  Icon,
  Input,
  Nav,
  Select,
  Text,
} from "../components/ui";

import {
  Bed,
  CaretLeft,
  CaretRight,
  CheckCircle,
  CloudArrowUp,
  MagnifyingGlass,
  File,
} from "../assets/icons";

import Header from "../components/layout/Header";

export default function ComponentsPage() {
  return (
    <div className="bg-bg-default h-full">
      {/* Text */}
      <div className="bg-bg-light">
        <Text textColor="primary" size="sm">
          Refund
        </Text>

        <Text textColor="secondary" size="md">
          Refund
        </Text>

        <Text textColor="inverted" size="lg">
          Refund
        </Text>

        <Text textColor="brand" weight="bold">
          Refund
        </Text>

        <Text className="text-text-primary">Refund</Text>

        <Text className="text-feedback-danger">Refund</Text>
      </div>

      {/* Icon */}
      <div>
        <Icon svg={Bed} />

        <Icon svg={CaretLeft} size="lg" fillColor="white" />
        <Icon svg={CaretRight} size="lg" fillColor="white" />

        <Icon svg={MagnifyingGlass} size="lg" fillColor="white" />

        <Icon svg={File} />

        <Icon svg={CloudArrowUp} size="lg" fillColor="white" />

        <Icon svg={CheckCircle} className="size-28" />
      </div>

      {/* Button */}
      <div className="flex flex-col gap-2 w-md border border-black p-4">
        <Button>Label</Button>

        <Button disabled={true}>Label</Button>
      </div>

      {/* Button - Magnifying Glass */}
      <div>
        <Button size="sm">
          <Icon svg={MagnifyingGlass} size="lg" fillColor="white" />
        </Button>

        <Button size="sm" disabled={true}>
          <Icon svg={MagnifyingGlass} size="lg" fillColor="white" />
        </Button>
      </div>

      {/* Button - Arrows */}
      <div className="flex gap-2.5">
        <Button size="xs">
          <Icon svg={CaretLeft} size="lg" fillColor="white" />
        </Button>

        <Button size="xs" disabled>
          <Icon svg={CaretRight} size="lg" fillColor="white" />
        </Button>
      </div>

      {/* Button - Modal */}
      <div className="flex gap-4 w-md border border-black p-4 justify-end">
        <Button variant="ghost" size="xs">
          Cancelar
        </Button>
        <Button>Confirmar</Button>
      </div>

      {/* Button - File */}
      <div>
        <Button variant="ghost" size="xs">
          <Icon svg={File} className="group-hover:fill-green-light" />
          Abrir comprovante
        </Button>
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-2">
        <Nav to="/">Solicitações de reembolso</Nav>
      </div>

      {/* Input */}
      <div className="bg-bg-light flex flex-col gap-6 w-md border border-black px-4 py-10">
        <Input label="Título" placeholder="Placeholder" />

        <Input label="Título" placeholder="Placeholder" error="Erro" />

        <FileInput label="Comprovante" accept=".jpg,.jpeg,.png,.pdf" />
      </div>

      {/* Select */}
      <div className="bg-bg-light flex flex-col gap-6 w-md border border-black p-4">
        <Select label="Categoria" defaultValue="">
          <option value="" disabled>
            Selecione
          </option>

          <option value="food">Alimentação</option>

          <option value="hosting">Hospedagem</option>

          <option value="transport">Transporte</option>

          <option value="services">Serviços</option>

          <option value="other">Outros</option>
        </Select>
      </div>

      {/* Header */}
      <Header />
    </div>
  );
}
