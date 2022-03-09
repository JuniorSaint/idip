import {
  FormControl,
  FormLabel,
  Input as ChakaraInput,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps {
  name: string;
  type: string;
  labelName?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, labelName, ...rest }: InputProps,
  ref
) => {
  return (
    <FormControl>
      {!!labelName && (
        <FormLabel marginLeft="10px" htmlFor="email">
          {labelName}
        </FormLabel>
      )}
      <ChakaraInput
        name={name}
        type={type}
        id={name}
        focusBorderColor="pink.500"
        backgroundColor="gray.900"
        variant="filled"
        _hover={{ backgroundColor: "gray.900" }}
        size="lg"
        {...rest}
        ref={ref}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
