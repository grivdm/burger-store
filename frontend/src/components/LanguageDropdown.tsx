import React, { useState, ReactNode } from 'react'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'





const LanguageDropdown: React.FC= () => {
    const {i18n}  = useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
    console.log('-----------my-------', i18n.language)

    const handleLanguageChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
        const newLanguage = event.target.value as string;
        setSelectedLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
      };
    return (
        <div>
      <Select value={selectedLanguage} onChange={handleLanguageChange}>
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="fr">FR</MenuItem>
      </Select>
    </div>
    )
}

export default LanguageDropdown