import styles from './SearchBar.module.css';
import { Search } from 'lucide-react'


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className={styles.wrapper}>
      <Search className={styles.icon} size={17} strokeWidth={2.5} />
        <input
            className={styles.input} 
            type="search" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}
