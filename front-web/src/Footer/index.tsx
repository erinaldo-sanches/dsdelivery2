import './styles.css';
import YouTubeIcon from "../Images/youtube.svg";
import LinkedInIcon from "../Images/linkedin.svg";
import InstagramIcon from "../Images/instagram.svg";

function Footer(){
    return(
        <footer className="main-footer">
            App desenvolvido durante a 2ª edição do evento Semana DevSuperior
            <div className="footer-icons">
                <a href="https://www.youtube.com/c/DevSuperior" target="_new">
                    <img 
                        src = {YouTubeIcon}
                        alt = "Youtube"
                    />

                </a>
                <a href="https://www.linkedin.com/school/devsuperior/" target="_new">
                    <img 
                        src = {LinkedInIcon} 
                        alt = "LinkedIn"
                    />

                </a>
                <a href="https://www.instagram.com/devsuperior.ig/">
                    <img 
                        src = {InstagramIcon} 
                        alt = "Instagram"
                    />

                </a>
            </div>

        </footer>
    )
}

export default Footer;