import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from '@ionic/react';
import { V1ClusterRoleBinding } from '@kubernetes/client-node'
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { subjectLink } from '../../../../utils/helpers';
import List from '../../misc/List';
import Configuration from '../../misc/template/Configuration';
import Metadata from '../../misc/template/Metadata';
import Row from '../../misc/template/Row';

interface IClusterRoleBindingDetailsProps extends RouteComponentProps {
  item: V1ClusterRoleBinding;
  section: string;
  type: string;
}

const ClusterRoleBindingDetails: React.FunctionComponent<IClusterRoleBindingDetailsProps> = ({ item, type }) => {
  return (
    <IonGrid>
      <IonRow>
        <Configuration>
          <Row obj={item} objKey="roleRef.kind" title="Role Kind" />
          <Row obj={item} objKey="roleRef.name" title="Role Name" />
        </Configuration>
      </IonRow>

      {item.metadata ?  <Metadata metadata={item.metadata} type={type} /> : null}

      {item.subjects ? (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Subjects</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {item.subjects.map((subject, index) => (
                    <IonItem key={index} routerLink={subjectLink(subject)} routerDirection="forward">
                      <IonLabel>
                        <h2>
                          {subject.kind
                            ? `${subject.kind}: ` : ''}{subject.namespace ? `${subject.namespace}/` : ''}{subject.name}
                        </h2>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ) : null}

      {item.metadata && item.metadata.name && item.metadata.namespace ? (
        <IonRow>
          <List name="Events" section="cluster" type="events" namespace={item.metadata.namespace} selector={`fieldSelector=involvedObject.name=${item.metadata.name}`} />
        </IonRow>
      ) : null}
    </IonGrid>
  )
};

export default ClusterRoleBindingDetails;
