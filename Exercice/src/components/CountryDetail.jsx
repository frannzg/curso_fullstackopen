export default function CountryDetail({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Área: {country.area} km²</p>
      <h3>Idiomas:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Bandera de ${country.name.common}`}
        style={{ width: '150px', border: '1px solid #ccc' }}
      />
    </div>
  )
}
