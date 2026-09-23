
export default function Formulario({
  title,
  fields,
  links,
  buttonText
}) {
  return (
    <div className="Formulario_login">
      <div className="container">
        <h2>{title}</h2>

        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>
              {field.label}
            </label>

            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
            />
          </div>
        ))}

        <nav>
          <ul>
            <li>
              {links?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                >
                  {link.text}
                </a>
              ))}
            </li>
          </ul>
        </nav>

        <button className="btn_enviar">
          {buttonText}
        </button>
      </div>
    </div>
  );
}