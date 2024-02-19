import styles from './code.module.scss'

function Code() {
    return (
        <div className={`container d-flex justify-content-center align-items-center flex-column ${styles.terms}`}>

            <h1>
                CODE OF CONDUCT
            </h1>

            <p>
                We are BlockWorld PVP. Each of us brings our special talents and gifts to the community. Together, we are building the world’s largest equitable gaming ecosystem.
            </p>
            <p>
                We strive to create a happy, supportive, agile, productive community that embraces new ideas and perspectives, as we continue to create groundbreaking gaming innovations together. We realize that this is possible only when people with very different needs, interests and skills collaborate, respect, and encourage each other.
            </p>
            <p>
                Diverse perspectives are powerful, and we encourage participation from anyone who brings them to our community. This Code of Conduct exists to ensure that everyone's participation in our community results in mutual benefit and enjoyment. We will not accept any form of prejudice (religious, racial, class, national or gender-related) that could hinder the participation of individuals in the project. Respect for our community and for each other are foundational to our success, and are something we need to support every day.
            </p>
            <p>
                The Code of Conduct is one way we put BlockWorld PVP’s values into practice and we expect it to be honored by everyone who represents Axie officially or informally, claims affiliation with the project, or participates directly.
            </p>
            <p>
                If you have a question or ever think BlockWorld PVP is missing the mark of our commitment outlined below, please speak up. We want to hear from you.
            </p>
            <div className={`${styles.text_start}`}>
                <p>
                    We strive to:
                </p>
            </div>
            <h4>
                1. Be considerate
            </h4>
            <p>
                Our efforts affect other people, and we in turn will depend on the work of others. Any behavior or decision affects those around us, so we should consider others when deciding how we want to behave.
            </p>
            <h4>
                2. Be respectful
            </h4>
            <p>
                Disagreement is no excuse for poor manners. We work together to resolve conflict, assume good intentions and do our best to act in a caring way. We don’t allow frustration to turn into personal attacks. A community where people are uncomfortable or threatened is not a healthy one.


            </p>
            <h4>
                3. Take responsibility for our words and our actions

            </h4>
            <p>
                Everyone makes mistakes; when we do, we take responsibility for them. If someone has been harmed or offended, we listen carefully and respectfully, and work to right the wrong.

            </p>
            <h4>
                4. Ask for help when unsure

            </h4>
            <p>
                Axie prides itself on being a welcoming and helpful community. Nobody is expected to be perfect, and we want to help everyone be successful. Asking questions early avoids many problems later, so questions are encouraged, though you may be directed to the appropriate forum. Those who are approached with a question should be responsive and helpful.


            </p>
            {/* <div className={`${styles.text_start}`}>
                <p>
                    Scholarship management
                </p>
            </div> */}
            <h4>
                5. Be collaborative

            </h4>
            <p>
                The products of our community are the complex results of many people’s ideas and dreams. We celebrate and champion collaboration within our community, knowing that it reduces redundancy and improves the quality of what we produce. Transparency is valued and prioritized as early and often as possible.

            </p>
            <h4>
                6. Value consensus
            </h4>
            <p>
                Disagreements both social and technical are normal, but we don’t allow them to linger. We expect participants in the project to resolve disagreements constructively. When they cannot, we escalate the matter to designated leaders to provide clarity and direction.


            </p>
            <h4>
                7. Maintain a healthy community space for all

            </h4>
            <p>
                BlockWorld PVP prides itself on being a friendly and collaborative community. This comes largely from our ability to hold ourselves, and each other accountable for our behavior. This includes escalating awareness of circumstances that make members of our community feel unfairly treated or threatened. In situations where you witness behaviors in the community that betray our Code of Conduct we encourage you to respectfully communicate your concerns directly with that individual or group.
            </p>
            <p>
                The BlockWorld PVP Code of Conduct is based on the OpenMRS Code of Conduct licensed under the Creative Commons Attribution-Share Alike 3.0 license. BlockWorld PVP appreciates the OpenMRS community for sharing their work!
            </p>
        </div>
    );
}

export default Code