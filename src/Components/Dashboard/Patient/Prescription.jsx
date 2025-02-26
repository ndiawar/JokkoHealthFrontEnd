import React from 'react';

const Prescription = () => {
    return (
        <div className="accordion" id="accordionExample" style={{ maxWidth: '950px', margin: '20px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: 'auto', overflowY: 'auto' }}>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne">
                        Prescription
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne">
                    <div className="accordion-body" style={{ padding: '20px' }}>
                        Surveiller son alimentation. Il est important de consommer des repas équilibrés et riches en nutriments pour maintenir une bonne santé.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Prescription
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                    <div className="accordion-body" style={{ padding: '20px' }}>
                        Le sommeil est crucial. Dormir suffisamment est essentiel pour la récupération physique et mentale. Visez 7 à 9 heures de sommeil par nuit.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree">
                        Prescription
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree">
                    <div className="accordion-body" style={{ padding: '20px' }}>
                        Le tabac est nocif. Évitez de fumer pour réduire les risques de maladies cardiovasculaires et respiratoires.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour">
                        Prescription
                    </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour">
                    <div className="accordion-body" style={{ padding: '20px' }}>
                        Remplacer le café par le thé vert. Le thé vert contient des antioxydants bénéfiques pour la santé et peut être une alternative plus saine au café.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prescription;
