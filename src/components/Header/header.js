import logo from '../../images/nevatrip_logo.svg';

function Header({ onSignOut, loggedIn }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
    </header>
  );
}
export default Header;
