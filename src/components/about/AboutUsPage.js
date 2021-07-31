import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import "./AboutUsPage.css";

export const AboutUsPage = () => {

    const team = [
        {
          name: 'Anna Sawicka-Ziółkowska',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'aniasawicka@gmail.com',
          image: 'img/about/77212945.jpeg',
          github: 'https://github.com/AnnaSawickaZiolkowska',
          linkedin: 'https://www.linkedin.com/in/annasawickaziolkowska?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAeeoAG%2FmRbaLFI6YeUl78A%3D%3D',
        },
        {
          name: 'Agnieszka Skorupa',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'agnieszka.agata.skorupa@gmail.com',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          github: 'https://github.com/agaskorupa',
          linkedin: 'https://www.linkedin.com/in/agnieszka-agata-skorupa',
          },
        {
          name: 'Przemysław Welenc',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'przewelenc@gmail.com',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          github: 'https://github.com/Przemo246',
          linkedin: 'https://www.linkedin.com/in/przemyslaw-welenc?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuErsH6LuRpuWudHZW26DeQ%3D%3D',
        },
        {
            name: 'Marcin Tomkiewicz',
            title: 'Junior Fronted Developer',
            description: '',
            email: 'marc.tomk@gmail.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
              github: 'https://github.com/MarcinTomkiewicz',
              linkedin: 'https://www.linkedin.com/in/marcintomkiewicz?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfMi60cHwTpWmt3Z1qiQJmQ%3D%3D',
          },
          {
            name: 'Dawid Ossowski',
            title: 'Junior Frontend Developer',
            description: '',
            email: 'ossowski.dawid@gmail.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            github: 'https://github.com/ossowskid',
            linkedin: 'https://www.linkedin.com/in/dawid-ossowski?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjpqcNpQ2T9uGfnXGlTC%2Fxw%3D%3D'
          },
    ]
      
  return (
    <>
    
    <div className="wrapper">
        <div className="team-header">
          <h2>Nasz zespół</h2>
          <p className="">Cześć! Jesteśmy uczestnikami kursu Junior Fronted Developer w infoShare Academy. Nie spotkaliśmy się nigdy osobiście, ale pomimo odległości dzielących nas i różnic charakterów, udało nam się efektywnie współtworzyć naszą aplikację. Poznaj nasz zespół:
          </p>
        </div>
        <div  className="team-gallery">
            {team.map(person=> (

            <div className="team-card">
              <img src={process.env.PUBLIC_URL/person.image} className="img" alt="team-member-img"/>
              <p className=""><strong>{person.name}</strong></p>
              <p className="">{person.title}</p>
              <p className="">{person.description}</p>
              <p className="">{person.email}</p>
              <ul className="">
                <a href={person.github} className="icon">
                  <FaGithub/> 
                </a>
                <a href={person.linkedin} className="icon">
                  <FaLinkedin/>
                </a>
              </ul>
            
            </div>
            ))}
        </div>
        </div>
   </>
  );
}



