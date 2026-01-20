import { useState } from 'react';
import './ContactPage.css';

//Pagina Contatti
function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Validazione del modulo
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Il nome è obbligatorio';
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email è obbligatoria';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email non valida';
        }
        if (!formData.subject) newErrors.subject = 'Seleziona un motivo';
        if (!formData.message.trim()) newErrors.message = 'Scrivi un messaggio';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus(null);

        if (validate()) {
            console.log('Messaggio inviato:', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset del form
        } else {
            setSubmitStatus('error');
        }
    };

    return (
        <div className="contact-container">
            <h1>Contattaci</h1>
            <p>Hai domande? Scrivici compilando il form qui sotto.</p>

            {/* Messaggio di successo */}
            {submitStatus === 'success' && (
                <div className="alert success">Messaggio inviato con successo!</div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <small className="error-text">{errors.name}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <small className="error-text">{errors.email}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Motivo</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'error' : ''}
                    >
                        <option value="">-- Seleziona --</option>
                        <option value="info">Informazioni Generali</option>
                        <option value="support">Supporto Ordini</option>
                        <option value="returns">Resi e Rimborsi</option>
                    </select>
                    {errors.subject && <small className="error-text">{errors.subject}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Messaggio</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? 'error' : ''}
                    ></textarea>
                    {errors.message && <small className="error-text">{errors.message}</small>}
                </div>

                <button type="submit" className="btn-primary">Invia Messaggio</button>
            </form>
        </div>
    );
}

export default ContactPage;
