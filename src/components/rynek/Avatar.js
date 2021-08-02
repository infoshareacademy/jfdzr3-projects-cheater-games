import styled from "styled-components";

const AvatarImg = styled.img`
width: 100%;
transform: scale3d(95%, 95%, 100%);
padding-bottom: 0px;
`;
export const Avatar = () => {
  return (
    <div className="avatar" style={{ width: "100%", minHeight: 0}}>
      <AvatarImg
        src="https://firebasestorage.googleapis.com/v0/b/monster-hunt-v1.appspot.com/o/test-avatar%2FMirek-handlarz2.png?alt=media&token=fa33bcf3-55e4-4c84-a774-4e289a10ce0b"
        alt=""/>
    </div>
  );
};
