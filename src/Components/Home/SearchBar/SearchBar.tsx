import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import style from './SearchBar.module.scss'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const SearchBar = () => {
  return <div className={style.container}>
      <button className={style.categoryButton}>
        Select Category
        <ArrowDropDownRoundedIcon fontSize='medium' />
      </button>
    
    <div className={style.search}>
      <input type="text" className={style.searchInput} />
      <button className={style.searchIconContainer}>
        <SearchRoundedIcon className={style.searchIcon} fontSize='medium' sx={{color:'white'}}/>
      </button>
    </div>
  </div>
}

export default SearchBar;