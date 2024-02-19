import styles from './marketplace_content.module.scss'
import Marketplace_filter from '../Marketplace_filter';
import Marketpace_dashboard from '../Marketplace_dashboard';

const Marketplace_content = () => {
    return (
        <div className={`${styles.m_content} d-flex col-xxl-9 col-xl-8`}>
            <Marketplace_filter />
            <Marketpace_dashboard />
        </div>
    );
}

export default Marketplace_content