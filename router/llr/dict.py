import copy

def to_dict(data):
    dic=data.__dict__
    copydic=copy.deepcopy(dic)
    copydic.pop('_sa_instance_state')
    return copydic

def to_list(data):
    d=copy.deepcopy(data)
    for i in range(len(d)):
        d[i]=to_dict(d[i])
    d=list(d)
    return d