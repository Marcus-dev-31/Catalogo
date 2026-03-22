interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
        <input 
            type="search" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}
