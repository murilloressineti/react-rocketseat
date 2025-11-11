import Text from "./components/text";
import Icon from "./components/icon";
import TrashIcon from "./assets/icons/trash.svg?react";
import CheckIcon from "./assets/icons/check.svg?react";
import PencilIcon from "./assets/icons/pencil.svg?react";
import SpinnerIcon from "./assets/icons/spinner.svg?react";
import PlusIcon from "./assets/icons/plus.svg?react";
import Badge from "./components/badge";
import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
import InputText from "./components/input-text";

export default function App() {
  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-1">
        <Text as="h1" variant="body-sm-bold" className="text-pink-base">
          Olá mundo
        </Text>

        <Text as="h1" className="text-green-base">
          Olá mundo
        </Text>

        <Text as="h1" variant="body-md-bold" className="text-pink-base">
          Olá mundo
        </Text>
      </div>

      <div className="flex gap-1">
        <Icon svg={TrashIcon} className="fill-green-dark" />
        <Icon svg={CheckIcon} className="fill-pink-base" />
        <Icon svg={PencilIcon} className="fill-gray-300" />
        <Icon svg={SpinnerIcon} animate className="fill-gray-300" />
      </div>

      <div>
        <Badge variant="secondary">5</Badge>
        <Badge variant="primary">2 de 5</Badge>
      </div>

      <div>
        <Button icon={PlusIcon}>Nova Tarefa</Button>
      </div>

      <div className="flex gap-1">
        <ButtonIcon icon={TrashIcon} />
        <ButtonIcon icon={TrashIcon} variant="secondary" />
        <ButtonIcon icon={TrashIcon} variant="tertiary" />
      </div>
      
      <div>
        <InputText />
      </div>
    </div>
  );
}
