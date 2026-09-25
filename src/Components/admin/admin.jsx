import './admin.css';
export default function AdminMenu({ title, parrafo, buttonContent, links, claseSeccion }) {
  
  const linksDashboard = [{ text: 'Chats', href: '/chats' }, { text: 'Config', href: '/config' }];
  const linksPerfil = [{ text: 'Mi Cuenta', href: '/cuenta' }, { text: 'Salir', href: '/logout' }];

  return (
    <div className={`menu ${claseSeccion}`}>
      <div className='Container_Menu'>
        <h2>{title}</h2>
        <p>{parrafo}</p>
        <nav>
          <ul>
            <li>
              {links?.map((link, index) => (
                <a key={index} href={link.href}>
                  {link.text}
                </a>
              ))}
            </li>
          </ul>
        </nav>
        <button className='btn_Content'>{buttonContent}</button>
      </div>
    </div>
  );
}