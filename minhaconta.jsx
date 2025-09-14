import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/me");
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
        alert("Não foi possível carregar seus dados.");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const open = showEmailModal || showPasswordModal;
    document.body.classList.toggle("modal-open", open);
    return () => document.body.classList.remove("modal-open");
  }, [showEmailModal, showPasswordModal]);

  const confirmEmailChange = async () => {
    if (!user) return;
    if (!tempEmail.trim()) {
      alert("Digite um e-mail válido.");
      return;
    }
    try {
      await api.put(`/api/users/${user.id}`, { email: tempEmail });
      setEmail(tempEmail);
      setShowEmailModal(false);
      setTempEmail("");
      alert("E-mail atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar e-mail", error);
      alert("Erro ao atualizar e-mail. Verifique se o formato é válido.");
    }
  };

  const confirmPasswordChange = async () => {
    if (!user) return;
    if (!newPassword.trim()) {
      alert("Digite a nova senha.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    try {
      await api.put(`/api/users/${user.id}`, { password: newPassword });
      setPassword("");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmNewPassword("");
      alert("Senha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar senha", error);
      alert("Erro ao atualizar senha. Tente novamente.");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("http://localhost:3030/api/users/logout");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deslogar", error);
      alert("Erro ao sair da conta.");
    }
  };

  return (
    <div className="page">
      <div className="corner">

        <div className="name">iSpotify ®</div>
        <button className="artists" id="button" onClick={() => navigate("/mainpage")}><img src="src/images/artists-icon.png" id="icon" alt="radio" width="16" height="16" />Artistas</button>
        <button className="liked-songs" id="button" onClick={() => navigate("/likedsongs")}><img src="src/images/favorite-icon.svg" id="icon" alt="heart" width="16" height="16" />Músicas Curtidas</button>
        <button className="minha-conta" id="button"><img src="src/assets/user.svg" id="icon" alt="user" width="16" height="16" />Minha Conta</button>
        <button className="logout" id="button" onClick={handleLogout}><img src="src/images/logout-icon.svg" id="icon" alt="door" width="16" height="16" />Logout</button>
      </div>


      <div className="content">
        <h1>Minha Conta</h1>

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" className="input-field"/>
          <button className="btn-green"
            onClick={() => {
              setTempEmail(email || "");
              setShowEmailModal(true);
            }}
          >
            Trocar E-mail
          </button>
        </div>

        <div className="form-group">
          <button
            className="btn-green"
            onClick={() => {
              setNewPassword("");
              setConfirmNewPassword("");
              setShowPasswordModal(true);
            }}
          >
            Trocar Senha
          </button>
        </div>
      </div>


      {showEmailModal && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Alterar e-mail">
            <h2>Novo E-mail</h2>
            <div className="modal-body">
              <div className="input-with-icon">
                <input type="email" placeholder="Email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="input-field"/>
                <span className="input-icon"></span>
              </div>

              <div className="modal-actions">
                <button className="btn-red" onClick={() => setShowEmailModal(false)}>Cancelar</button>
                <button className="btn-green" onClick={confirmEmailChange}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Alterar senha">
            <h2>Nova senha</h2>
            <div className="modal-body">
              <div className="input-with-icon">
                <input type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field"/>
                <span className="input-icon"></span>
              </div>

              <div className="input-with-icon">
                <input type="password" placeholder="Confirmar nova senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="input-field"/>
                <span className="input-icon"></span>
              </div>

              <div className="modal-actions">
                <button className="btn-red" onClick={() => setShowPasswordModal(false)}>Cancelar</button>
                <button className="btn-green" onClick={confirmPasswordChange}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
