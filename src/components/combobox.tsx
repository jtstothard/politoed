"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CommandComboboxContextType = ReturnType<typeof useComboBox>;

export const CommandComboboxContext =
  React.createContext<CommandComboboxContextType | null>(null);

interface CommandComboboxProp {
  loading?: boolean;
  options: { value: string; label: string }[];
  onChange?: (value?: string) => void;
  value?: string;
}

interface getLabelArg extends Pick<CommandComboboxProp, "loading" | "options"> {
  selected?: string;
}

const getLabel = ({ loading, options, selected }: getLabelArg) => {
  if (loading) return "Loading...";

  const selectedOption = options.find((option) => option.value === selected);

  if (!selectedOption) return "Select option...";

  return selectedOption.label;
};

const useComboBox = (props: CommandComboboxProp) => {
  const { loading = false, options, onChange, value } = props;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value ?? "");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (currentValue: string) => {
    const selectedValue = currentValue === selected ? "" : currentValue;
    setSelected(selectedValue);
    onChange?.(selectedValue);
    handleClose();
  };

  const label = getLabel({ loading, options, selected });

  return {
    loading,
    options,
    open,
    handleSelect,
    label,
    selected,
    handleOpen,
    handleClose,
  };
};

export function CommandCombobox(props: CommandComboboxProp) {
  const state = useComboBox(props);

  const { loading, options, open, handleSelect, label, handleOpen, selected } =
    state;

  return (
    <CommandComboboxContext.Provider value={state}>
      <Popover open={open} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            disabled={loading}
          >
            {label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={handleSelect}
                  value={option.value}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </CommandComboboxContext.Provider>
  );
}
