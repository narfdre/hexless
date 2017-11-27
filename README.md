# hexless
POC of serverless/kubeless for hexly

1. Install minikube
```console
$ brew cask install minikube
```

2. Install xhyve driver and set up
```console
$ brew install docker-machine-driver-xhyve

# docker-machine-driver-xhyve need root owner and uid
$ sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
$ sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
```

3. Install kubeless
```console
$ brew install kubeless/tap/kubeless
```

4. Run minikube 
```console
$ minikube start —-vm-driver=xhyve
```

5. Add kubeless to minikube
```console
$ export RELEASE=v0.3.0
$ kubectl create ns kubeless
$ kubectl create -f https://github.com/kubeless/kubeless/releases/download/$RELEASE/kubeless-$RELEASE.yaml
```
6. Install an Ingress Controller in case you still don't have one:
```console
$ curl -sL https://raw.githubusercontent.com/kubeless/kubeless/master/manifests/ingress/ingress-controller-http-only.yaml | kubectl create -f - 
```
7. Deploy a MongoDB service. It will be used to store the state of our application:
```console
$ curl -sL https://raw.githubusercontent.com/bitnami/bitnami-docker-mongodb/master/kubernetes.yml | kubectl create -f -
```

8. Deploy
```console
$ cd backend && npm install && serverless deploy && cd -
```

9. Run front-end
```console
$ cd frontend && npm install && npm start && cd -
```

