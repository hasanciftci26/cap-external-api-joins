using {Orders as ord} from '../db/data-model';

service NorthwindSrv {
    entity Orders as select from ord;
};
