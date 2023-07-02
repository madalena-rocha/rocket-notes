import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Avatar } from "./styles";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  // preencher o valor padrão como o valor armazenado no contexto do usuário autenticado
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;
  // verificar se o usuário tem um avatar, se sim, mostrar a url para buscar a imagem no back-end, caso contrário, exibir o avatarPlaceholder

  const [avatar, setAvatar] = useState(avatarURL); // se o usuário já tiver um avatar, colocá-lo aqui
  const [avatarFile, setAvatarFile] = useState(null); // carregar a nova imagem selecionada pelo usuário

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
    setLoading(true);

    try {
      const updated = {
        name,
        email,
        password: passwordNew,
        old_password: passwordOld,
      };

      const userUpdated = Object.assign(user, updated);
      // juntar o que já tem, no caso o avatar, com os dados atualizados

      await updateProfile({ user: userUpdated, avatarFile });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
        console.log("Erro ao atualizar o perfil:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0]; // pegar uma única foto selecionada pelo usuário
    setAvatarFile(file);

    // toda vez que o usuário mudar de avatar, gerar uma url para atualizar o estado avatar, que exibe o avatar
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={"2.4rem"} />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt={user.name} />

          <label htmlFor="avatar">
            <FiCamera />

            <input
              // input invisível utilizado somente para abrir a janela de carregar imagem
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate} loading={loading} />
      </Form>
    </Container>
  );
}
