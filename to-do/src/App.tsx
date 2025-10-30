import Text from "./components/text";
import Icon from "./components/icon";
import TrashIcon from "./assets/icons/trash.svg?react"
import CheckIcon from "./assets/icons/check.svg?react"
import PencilIcon from "./assets/icons/pencil.svg?react"
import SpinnerIcon from "./assets/icons/spinner.svg?react"

export default function App() {
  return (
    <div className="grid gap-3">
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
        <Icon svg={CheckIcon} className="fill-pink-base"/>
        <Icon svg={PencilIcon} className="fill-gray-300"/>
        <Icon svg={SpinnerIcon} animate className="fill-gray-300"/>
      </div>
    </div>
  );
}
