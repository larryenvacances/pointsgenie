import React, { Component } from "react";
import {Button} from "react-bootstrap";

class DescriptionPage extends Component {
  static displayName = "DescriptionPage";

  render() {
    return (
      <div className="description">
        <h2>Description des postes</h2>
        <h5>Ci-bas est la description des postes de divers événements : </h5>

        <p>&nbsp;</p>

        <h3>Cérémonie de remise des joncs</h3>
        <p>La remise des joncs aura lieu le 12 novembre 2016 de 12h30 au milieu de l’après midi (~15h30), il est proposé que les bénévoles se présentent directement au centre culturel pour y être orientés.</p>
        
        <p>&nbsp;</p>
        <h4>Horaire de 11h00 à 12h30</h4>
        <h5><strong>Stationnement <em>(5 postes, 1 point par poste)</em></strong></h5>
        <p>En charge de l’orientation des invités vers les stationnements disponibles, Parking B3 K1, J2. Ce travail est à l'extérieur.</p>
        
        <p>&nbsp;</p>
        <h4>Horaire de 11h30 à 12h30</h4>
        <h5><strong>Accueil/orientation <em>(1 poste, 1 point par poste)</em></strong></h5>
        <p>En charge d’accueillir et d’orienter les invités dans le hall du centre culturel.</p>
        <h5><strong>Vente billets <em>(3 postes, 1 point par poste)</em></strong></h5>
        <p>En charge de la vente de billets de consommations lors de l’évènement.</p>

        <p>&nbsp;</p>
        <h4>Horaire de 12h00 à 15h30</h4>
       <h5><strong>Organisation de la file <em>(1 poste, 3 points par poste)</em></strong></h5>
        <p>En charge de la liste et de l’organisation des finissants en ordre alphabétique pour faciliter la remise des joncs (tenue de soirée exigée).</p>
        <h5><strong>Remise des joncs <em>(1 poste, 3 points par poste)</em></strong></h5>
        <p>S’occupe de remettre le jonc aux finissants montant sur scène (tenue de soirée exigée).</p>

        <p>&nbsp;</p>
        <h3>Soirée Casino</h3>
        <p>La soirée se déroule de 20h à 23h dans la cafétéria de Génie et dans le salon de l'AGEG. Les bénévoles doivent arriver aux heures qui correspondent 
        à chacun des postes.</p>

        <p>&nbsp;</p>
        <h4>Horaire de 18h00 à 00h00</h4>
        <h5><strong>Croupier <em>(37 postes, 4 points par poste)</em></strong></h5>
        <p>S’occupent de l’animation et la gestion des tables de jeux. Formation sur place à 18h15, tenue de soirée exigée.</p>

        <p>&nbsp;</p>
        <h4>Horaire de 18h30 à 00h00</h4>
        <h5><strong>Stationnement + Sécurité <em>(4 postes, 4 points par poste)</em></strong></h5>
        <p>En charge de l’orientation des invités vers les stationnements disponibles P C-2 ,B-3, puis travail de sécurité. Ce travail est en parti à l'extérieur.</p>
        <h5><strong>Sécurité <em>(4 postes, 4 points par poste)</em></strong></h5>
        <p>Doit s’assurer que personne ne quitte le périmètre avec de l’alcool et intervenir en cas de comportements déplacés.</p>
        <h5><strong>Service de l'alcool <em>(7 postes, 4 points par poste)</em></strong></h5>
        <p>En charge du service et de la réception des paiements pour les boissons. Tenue de soirée exigée.</p>
        <h5><strong>Accueil et vente de jetons <em>(2 postes, 4 points par poste)</em></strong></h5>
        <p>En charge de l’accueil et l’orientation des invités et de la vente des jetons pour les jeux. Tenue de soirée exigée.</p>
      </div>
    );
  }
};

export default DescriptionPage;
