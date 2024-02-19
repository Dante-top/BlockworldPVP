import styles from './marketplace_dashboard.module.scss'
import Marketpace_search from '../Marketplace_search'
import Marketpace_items from '../Marketplace_items';

const Marketpace_dashboard = () => {
    return (
        <div className={`${styles.m_dashboard} col-xxl-9 col-xl-8 col-ls-7`}>
            <Marketpace_search />
            <Marketpace_items />
        </div>
    );
}

export default Marketpace_dashboard